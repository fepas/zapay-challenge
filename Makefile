prepare_api:	
	chmod +x ./api/entrypoint.sh 

prepare_front:	
	cd frontend && npm install 

up:
	docker-compose up

run_tests:
	docker run zapay_api sh -c 'pytest -v test.py'

start: prepare_api prepare_front up

rebuild:
	docker-compose up --build

rebuild_all: prepare_api prepare_front rebuild

stop:
	docker-compose down