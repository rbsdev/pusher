# ZH Grenal Pusher

Extension for Chrome ~~and Firefox as well as desktop apps for Linux, Mac and Windows~~ to receive the latest news about your beloved team.

[<img src="app/images/inter/32x32.png" alt="" width="12" height="12"> Colorado ZH](https://chrome.google.com/webstore/detail/colorado-zh/gghhcgmlagdlnjmhefdbnggmbkceljea)
<br>
[<img src="app/images/gremio/32x32.png" alt="" width="12" height="12"> Gremista ZH](https://chrome.google.com/webstore/detail/gremista-zh/coohoedggicbccndfghdgfmhioijnahd)

### Build

```bash
grunt build
```

### Service

To obtain a pusher news list you can access a URL provided at response of:

```
http://localhost:8080/pusher-data-service/api/news/list/[gremio|inter]
```
