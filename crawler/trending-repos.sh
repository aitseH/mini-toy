curl -G https://api.github.com/search/repositories       \
    --data-urlencode "q=created:>`date -v-7d '+%Y-%m-%d'`" \
    --data-urlencode "sort=stars"                          \
    --data-urlencode "order=desc"                          \
    -H "Accept: application/vnd.github.preview"            \
    | jq ".items[] | {name, description, language, watchers_count, html_url}"