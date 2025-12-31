define _alert_success
	$(call _alert_message,Script Completed)
endef

start:
	PORT=6014 yarn start

test:
	yarn test

deps:
	yarn install

build-app:
	yarn run build

web_app_dir := /var/www/avni-int-service
tmp_web_app_dir := /tmp/avni-int-service

_zip-app:
	cp ./env-templates/$(template) .env
	yarn run build
	tar -czvf avni-int-admin-app.tgz  -C build .
	cp ./env-templates/local-apache.template .env

_zip-app-only:
	cp ./env-templates/$(template) .env
	tar -czvf avni-int-admin-app.tgz  -C build .
	cp ./env-templates/local-apache.template .env

zip-app-prod:
	make _zip-app template=prod.template

zip-app-prerelease:
	make _zip-app template=prerelease.template

zip-app-staging:
	make _zip-app template=staging.template

zip-app-rwb-staging:
	make _zip-app template=rwb-staging.template

zip-app-rwb-prod:
	make _zip-app template=rwb-prod.template

zip-app-only-prod:
	make _zip-app-only template=prod.template

zip-app-only-staging:
	make _zip-app-only template=staging.template

zip-app-only-rwb-prod:
	make _zip-app-only template=rwb-prod.template

zip-app-only-rwb-staging:
	make _zip-app-only template=rwb-staging.template

zip-app-only-prerelease:
	make _zip-app-only template=prerelease.template

foo:
	$(call _remote_ashwini_command,"echo hello")

deploy-vagrant:
	cp ./env-templates/$(template) .env
	yarn run build
	echo vagrant | pbcopy
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "rm -rf $(web_app_dir)"
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "mkdir $(web_app_dir)"
	scp -r -P 2222 -i ~/.vagrant.d/insecure_private_key build/* root@127.0.0.1:$(web_app_dir)
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "chmod -R 755 $(web_app_dir)"
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "chown -R bahmni:bahmni $(web_app_dir)"

local_web_app_dir := /var/www/avni-int-service

deploy-local:
	rm -rf $(local_web_app_dir)
	mkdir -p $(local_web_app_dir)
	cp ./env-templates/local-apache.template .env
	yarn run build
	cp -r build/* $(local_web_app_dir)/
