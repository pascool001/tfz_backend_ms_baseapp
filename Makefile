.PHONY: save

push:
	git add .
	git commit -m "push au $$(date +%d/%m/%Y-%H:%M)"
	git push
