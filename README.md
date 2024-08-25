# survivor-pool

## Restore DB from backup

- Download and unzip the backup tar.gz from S3
- Run `pg_restore -d 'DATABASE_URL' BACKUP_FOLDER`
