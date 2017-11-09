# Simple event registration for Longship


# To setup the backend

```
mkvirtualenv events_longship -p $(which python3)
workon events_longship
pip install -r requirements/base.txt
createdb events_longship
python manage.py migrate
python manage.py runserver
```
