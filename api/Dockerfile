FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

RUN pip install "poetry==1.0.0"

COPY ./pyproject.toml /app
COPY ./poetry.lock /app

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

COPY ./app /app

ENTRYPOINT ["/start-reload.sh"]
