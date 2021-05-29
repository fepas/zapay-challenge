FROM python:3.8.0-alpine

WORKDIR /api

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /api

RUN chmod +x /api/entrypoint.sh

# run server
CMD ["/api/entrypoint.sh"]