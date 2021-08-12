start:
	PORT=6033 yarn start

test:
	yarn test

build-app:
	yarn run build

deploy-ashwini: build-app
	scp integrator/build/libs/integrator-0.0.1-SNAPSHOT.jar dspace-auto:/tmp/
	ssh dspace-auto "scp /tmp/integrator-0.0.1-SNAPSHOT.jar ashwini:/root/source/abi-host/"
#	-ssh gunak-other "mkdir /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/"
#	-ssh gunak-other "rm -rf /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/*"
#	scp -r build/* gunak-other:/home/app/qa-server/facilities-assessment-host/app-servers/dashboard/

local_web_app_dir := /Library/WebServer/Documents/abi-admin-app

deploy-to-local:
	-rm -rf $(local_web_app_dir)
	mkdir $(local_web_app_dir)
	cp ./env-templates/local-apache.template .env
	yarn run build
	cp -r build/* $(local_web_app_dir)/

edit-apache-conf:
	sudo vi /etc/apache2/httpd.conf

restart-apache-local:
	sudo apachectl restart
