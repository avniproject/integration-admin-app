import { stringify } from 'query-string';
import {fetchUtils} from 'react-admin';
import Pagination from "./framework/Pagination";
import ResourceFilter from "./framework/ResourceFilter";
import SpringResponse from "./framework/SpringResponse";

export default (apiUrl, httpClient = fetchUtils.fetchJson, countHeader = 'Content-Range') => ({
    getList: (configuredResource, params) => {
        let resource = configuredResource.split("-")[0];
        let url = '';
        let pagination = Pagination.asSpringUrlPart(params.pagination, params.sort);
        let filter = params.filter;
        let typeOfListing = ResourceFilter.getTypeOfListing(filter);
        if (typeOfListing === ResourceFilter.ENTITY) {
            url = `${apiUrl}/${resource}?${pagination}`;
        } else if (typeOfListing === ResourceFilter.ENTITY_BY_PARAM_LIKE) {
            url = `${apiUrl}/${resource}/search/find?${stringify(filter)}&${pagination}`;
        } else if (typeOfListing === ResourceFilter.ENTITY_BY_PARENT) {
            url = `${apiUrl}/${resource}/${ResourceFilter.getResourcePath_ByParent(filter)}?${ResourceFilter.getParentParamString(filter)}&${pagination}`;
        }
        console.log("DataProvider.getList", url);
        return httpClient(url).then(({json}) =>
            SpringResponse.toReactAdminResourceListResponse(json, resource)
        );
    },

    getOne: (configuredResource, params) => {
        let resource = configuredResource.split("-")[0];
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
            data: json,
        }));
    },

    getMany: (configuredResource, params) => {
        let resource = configuredResource.split("-")[0];
        const str = params.ids.join(",");
        const url = `${apiUrl}/${resource}?ids=${str}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (configuredResource, params) => {
        let resource = configuredResource.split("-")[0];
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                    // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                    headers: new Headers({
                        Range: `${resource}=${rangeStart}-${rangeEnd}`,
                    }),
                }
                : {};

        return httpClient(url, options).then(({ headers, json }) => {
            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                        headers.get('content-range').split('/').pop(),
                        10
                        )
                        : parseInt(headers.get(countHeader.toLowerCase())),
            };
        });
    },

    update: (configuredResource, params) => {
        let resource = configuredResource.split("-")[0];
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (configuredResource, params) => {
      let resource = configuredResource.split("-")[0];
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
          })
        )
      ).then(responses => ({data: responses.map(({json}) => json.id)}))
    },

    create: (configuredResource, params) => {
      let resource = configuredResource.split("-")[0];
      return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },
    delete: (configuredResource, params) => {
      let resource = configuredResource.split("-")[0];
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'text/plain',
        }),
      }).then(({json}) => ({data: json}))
    },

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (configuredResource, params) => {
      let resource = configuredResource.split("-")[0];
      return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                })
            )
        ).then(responses => ({
            data: responses.map(({ json }) => json.id),
        }))
    },
});
