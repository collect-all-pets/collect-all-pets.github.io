.PHONY: deploy-prod deploy-beta

deploy-prod:
	ng deploy --base-href=/

deploy-beta:
	ng deploy --base-href=/ --repo=git@github.com:cap-beta/cap-beta.github.io.git

