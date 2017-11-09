# Social Investment Data Labs Specification (Alpha)

The Social Investment Data Labs Specification is being developed as a draft data specification for describing social investment. For more information contact jack.lord@opendataservices.coop or bob.harper@opendataservices.coop

## Building the documentation

### Build the docs locally

Assuming a unix based system:

```
# Make sure you have python3 venv, e.g. for Ubuntu
# If you're not sure, try creating a venv, and see if it errors
sudo apt-get install python3-venv

# Create a venv
python3 -m venv .ve    
# Enter the venv, needs to be run for every new shell
source .ve/bin/activate
# Install requirements
pip install -r requirements.txt
python setup.py
# Build the docs
cd docs
make dirhtml
```

Built docs are in `docs/_build/dirhtml`.


Viewing the docs:
```
cd _build/dirhtml
python -m http.server
```

Then go to http://localhost:8000/ in a browser.


### Building on readthedocs

* Select your repo at: https://readthedocs.org/dashboard/import/
* Tick: "Edit advanced project options:"
* Click "Next" button
* Documentation type: "Sphinx HtmlDir"
* Click "Finish" button
* Click "Admin" button, then "Advanced Settings" in the left hand nav
* Requirements file: "requirements.txt"
* Python interpreter: "CPython 3.x"
* Click "Submit" button



### Translations

Translations are generally done using this transifex project.
Create one at https://www.transifex.com/OpenDataServices/add/ :
* Select "Public project" and "File-based Project".
* Add the url of the project to this README, e.g. https://www.transifex.com/OpenDataServices/sphinx-base/dashboard/

How to push new text up to Transifex:

First, do a local build, then:

```
cd docs
make gettext
sphinx-intl update-txconfig-resources --transifex-project-name <project-name>
tx push -s
```

When the translations are filled in transifex you need to run:

```
tx pull -a -f
```

These should then be commited and then pushed to GitHub (so that actual
deployed translations are always version controlled).

Running the build in another language:

```
make -e SPHINXOPTS="-D language='<language code>'" html
```

If translations are added locally, these can also be pushed up to Transifex:

```
tx push -t --skip
```
