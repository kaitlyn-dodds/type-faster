## Deploy

### Build

```bash
npm run build
```

### Copy files to server (from local machine)

```powershell
scp -r dist\* kaitlyn@192.168.0.101:/var/www/type-faster/releases/$TYPE_FASTER_APP_VERSION
```

#### Verify Files

```powershell
ssh kaitlyn@192.168.0.101
ls /var/www/type-faster/releases/$TYPE_FASTER_APP_VERSION
```

#### Verify File/Directory Permissions

```powershell
sudo chown -R kaitlyn:kaitlyn /var/www/type-faster
sudo find /var/www/type-faster -type d -exec chmod 755 {} \;
sudo find /var/www/type-faster -type f -exec chmod 644 {} \;
```

### Set Current Release

```powershell
sudo ln -s /var/www/type-faster/releases/$TYPE_FASTER_APP_VERSION /var/www/type-faster/current
```

### Restart Server

```powershell
sudo systemctl restart nginx
```

### Verify

From your local machine, navigate to `http://192.168.0.101`

### Troubleshooting

#### Tail Nginx Logs

```powershell
ssh kaitlyn@192.168.0.101
sudo tail -f /var/log/nginx/error.log
```

#### Verify Nginx is listening on port 80

```powershell
ssh kaitlyn@192.168.0.101
sudo ss -tulpn | grep nginx
```

Expect `LISTEN ... 0.0.0.0:80`

### Disable Nginx Default Site (if needed)

```powershell
ssh kaitlyn@192.168.0.101
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### Check Firewall (if enabled)

```powershell
ssh kaitlyn@192.168.0.101
sudo ufw status
```

Expect `80/tcp` to be enabled