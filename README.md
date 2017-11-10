# Simple event registration for Longship


# Backend development

```
mkvirtualenv events_longship -p $(which python3)
workon events_longship
pip install -r requirements/base.txt
createdb events_longship
python manage.py migrate
python manage.py runserver
```

# Frontend development

```
npm install -g yarn
yarn start
```

# Build containers

```
./build.sh
```

# Start containers

```
docker-compose up -d
```

# Stop containers

```
docker-compose stop
```