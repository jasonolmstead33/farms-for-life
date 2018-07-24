package_server: 
	mkdir -p artifacts
	zip -r artifacts/Server-$(ts).zip index.js node_modules/ server/

package_client: 
	mkdir -p artifacts
	zip -r artifacts/Client-$(ts).zip client/

clean:
	rm -f artifacts/

ts := $(shell /bin/date "+%Y-%m-%d-%H:%M:%S")

timestamp:
	@echo Timestamp is $(ts)