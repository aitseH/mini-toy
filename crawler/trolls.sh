curl -G https://api.github.com/search/issues             \
    --data-urlencode "q=created:>`date -v-7d '+%Y-%m-%d'`" \
    --data-urlencode 'sort=comments'                       \
    --data-urlencode 'order=desc'                          \
    -H 'Accept: application/vnd.github.preview'            \
    | jq '.items[0,1,2] | {html_url, title, comments}'