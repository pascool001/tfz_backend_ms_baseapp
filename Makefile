.PHONY: save

save:
	git add .
	git commit -m "push au $$(date +%d/%m/%Y-%H:%M)"
	git push
