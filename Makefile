start:
	PORT=6030 yarn start

test:
	yarn test

deploy-nhsrc-qa:
	yarn run build
#	-ssh gunak-other "mkdir /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/"
#	-ssh gunak-other "rm -rf /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/*"
#	scp -r build/* gunak-other:/home/app/qa-server/facilities-assessment-host/app-servers/dashboard/

deploy-to-local:
	yarn run build
#	rm -rf ../facilities-assessment-server/dashboard/* && cp -r build/* ../facilities-assessment-server/dashboard/
