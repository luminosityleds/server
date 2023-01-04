import os
from jira import JIRA

JIRA_OPTIONS = {'server': os.environ['JIRA_URL']}

jira = JIRA(options=JIRA_OPTIONS, basic_auth=(os.environ['JIRA_USERNAME'], os.environ['JIRA_PASSWORD']))

ID = []

VERSIONS = jira.project_versions("LL")

for v in VERSIONS:
    ID.append(v.id)

JIRA_PROJECT_ID = max(ID)

VERSION = jira.version(JIRA_PROJECT_ID)

def write_version_description():
    """ Appends version description field to ./release_notes.md:
        description: str """
    # 'a' = append mode
    with open('release_notes.md', 'a') as f:
        f.write(f"{VERSION.description}\n\n")

def write_bug_fields():
    """ Appends following bug fields to ./release_notes.md:
        name: str
        key (LL-name): str """
    bugs = jira.search_issues(f"issueType = Bug AND fixVERSION = {VERSION}")
    # 'a' = append mode
    # bug issue name = bug.get_field('summary')
    with open('release_notes.md', 'a') as f:
        f.write('<h1> Bug <img src="https://cdn-icons-png.flaticon.com/512/1320/1320452.png" alt="drawing" width="25"/> </h1>\n\n')
        for bug in bugs:
            f.write(f"<h3><a href=https://luminosity-led.atlassian.net/browse/{bug.key}>{bug.key} </a>{bug.get_field('summary')}</h3>" + '\n\n')

def write_story_fields():
    """ Appends following story fields to ./release_notes.md:
        name: str
        key (LL-name): str """
    stories = jira.search_issues(f"issueType = Story AND fixVERSION = {VERSION}")
    # 'a' = append mode
    # story issue name = story.get_field('summary')
    with open('release_notes.md', 'a') as f:
        f.write('<h1> Story <img src="https://cdn-icons-png.flaticon.com/512/2421/2421066.png" alt="drawing" width="25"/> </h1>\n\n')
        for story in stories:
            f.write(f"<h3><a href=https://luminosity-led.atlassian.net/browse/{story.key}>{story.key} </a>{story.get_field('summary')}</h3>" + '\n\n')

if __name__ == '__main__':
    write_version_description()
    write_bug_fields()
    write_story_fields()