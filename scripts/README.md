# Scripts
This directory acts as helper scripts for activities such as generating release notes.

## Source: https://www.learnpython.org/en/Hello%2C_World%21

Python is a very simple language, and has a very straightforward syntax. It encourages programmers to program without boilerplate (prepared) code. The simplest directive in Python is the "print" directive - it simply prints out a line (and also includes a newline, unlike in C).

There are two major Python versions, Python 2 and Python 3. Python 2 and 3 are quite different. This tutorial uses Python 3, because it more semantically correct and supports newer features.

The project will use Python 3.10.

For example, one difference between Python 2 and 3 is the print statement. In Python 2, the "print" statement is not a function, and therefore it is invoked without parentheses. However, in Python 3, it is a function, and must be invoked with parentheses.

### Creating a virtual environment
Virtual environments create isolated Python environments.  It allows you to install the necessary packages into the environment to be used exclusively by that virtual environment.

### Steps to create a virtual environment
1. Make sure you have python installed by running `python`.
Note: If you get an error while installing typing in python, follow the instructions to install python found here: https://luminosity-led.atlassian.net/wiki/spaces/LL/pages/262146/Setup+Dev+Environment
2. `cd scripts/`
3. Create the virtual environment with `python -m venv .venv`
4. Activate the virtual environment with `source .venv/Scripts/activate`
5. Install the python modules in the requirements.txt with `pip install -r requirements.txt`.
6. You have setup your virtual environment and installed python modules into it.
7. Once you're done, deactivate the virtual environment with `deactivate`.

### create_jira_release_notes.py
This script queries the JIRA rest API to get the issues which are earmarked for a JIRA release.

https://support.atlassian.com/jira-software-cloud/docs/advanced-search-reference-jql-fields/

It uses the JIRA python API for querying.

https://jira.readthedocs.io/api.html

By default, JIRA release notes are created only when a new version of the website is released, but the script can be run manually.

1. Follow the `Steps to create a virtual environment` section to setup a virtual environment. 
2. Ask project manager for all of the following environment variables
<ol type='a'>
<li>
JIRA_URL
</li>
<li>
JIRA_USERNAME
</li>
<li>
JIRA_PASSWORD
</li>
<li>
JIRA_PROJECT_ID
</li>
</ol>

3. `python create_jira_release_notes.py`
4. A file called `release_notes.md` will be generated in the directory.