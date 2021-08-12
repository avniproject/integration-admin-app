start:
	PORT=6033 yarn start

test:
	yarn test

build-app:
	yarn run build

web_app_dir := /var/www/abi-admin-app
tmp_web_app_dir := /tmp/abi-admin-app

define _remote_ashwini_command
	ssh dspace-auto "ssh ashwini \"$1\""
endef

foo:
	$(call _remote_ashwini_command,"echo hello")

deploy-ashwini:
	cp ./env-templates/prod.template .env
	yarn run build
	ssh dspace-auto "rm -rf $(tmp_web_app_dir)"
	ssh dspace-auto "mkdir $(tmp_web_app_dir)"
	#$(call _remote_ashwini_command,"rm -rf $(web_app_dir)")
	$(call _remote_ashwini_command,"mkdir $(web_app_dir)")
	scp -r build/* dspace-auto:$(tmp_web_app_dir)
	ssh dspace-auto "scp -r $(tmp_web_app_dir)/* ashwini:$(web_app_dir)"
	$(call _remote_ashwini_command,"chmod -R 755 $(web_app_dir)")
	$(call _remote_ashwini_command,"chown -R bahmni:bahmni $(web_app_dir)")

deploy-vagrant:
	cp ./env-templates/prod.template .env
	yarn run build
	echo vagrant | pbcopy
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "rm -rf $(web_app_dir)"
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "mkdir $(web_app_dir)"
	scp -r -P 2222 -i ~/.vagrant.d/insecure_private_key build/* root@127.0.0.1:$(web_app_dir)
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "chmod -R 755 $(web_app_dir)"
	ssh -p 2222 -i ~/.vagrant.d/insecure_private_key root@127.0.0.1 "chown -R bahmni:bahmni $(web_app_dir)"

local_web_app_dir := /Library/WebServer/Documents/abi-admin-app

deploy-local:
	-rm -rf $(local_web_app_dir)
	mkdir $(local_web_app_dir)
	cp ./env-templates/local-apache.template .env
	yarn run build
	cp -r build/* $(local_web_app_dir)/

edit-apache-conf:
	sudo vi /etc/apache2/httpd.conf

restart-apache-local:
	sudo apachectl restart
