# BrainDumpShrinkBot

HackTheGap 2017 Project

## Installing

Fork/Clone repository at
[`https://github.com/BrainDumpShrinkBot/brain_dump_shrink_bot`](`https://github.com/BrainDumpShrinkBot/brain_dump_shrink_bot`):

```bash
git clone git@github.com:BrainDumpShrinkBot/brain_dump_shrink_bot.git
cd brain_dump_shrink_bot
```

## Initializing

The application has three parts:

* A Node.js Express application
* A Python NLP tag extractor
* Mongo Database

### Express app

```
npm install
```

or

```
yarn
```

### Python service

```
cd tag_extractor
pip install -r requirements.txt
```

(The service is written with Python 3.5, it works best if you're
running with a virtual env.)

### Mongo DB service

You should have mongodb installed and running the environment you'll
be working in.

## Configuration

The mongo database url is configured for the run environment in the
`./config/` directory using the file name that matches the run
environment, i.e. `development`, `test`, `production`.

## Usage

To start the application, from the application root, run

```
npm start
```
