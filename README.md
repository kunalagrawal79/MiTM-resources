# MITM Math Resource Atlas

This repository contains a static resource page for MITM-related math resources, organized as a searchable directory.

The page is intentionally framework-free so it can be published to GitHub Pages with almost no setup.

## Files

- `index.html`: page structure
- `styles.css`: layout, typography, filters, and responsive styling
- `app.js`: filtering and rendering logic
- `resources.js`: the curated resource data

If you want to update the directory later, `resources.js` is the main file to edit.

## Local Preview

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Publish on GitHub Pages

If you do not already have a GitHub repository for this project:

1. Create a new repository on GitHub.
2. In this folder, add the remote:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

3. Commit and push:

```bash
git add .
git commit -m "Initial MITM resource site"
git push -u origin main
```

4. On GitHub, open `Settings` -> `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select branch `main` and folder `/ (root)`.
7. Save. GitHub will publish the site automatically.

If the repository is a project repository rather than `YOUR-USERNAME.github.io`, the site will usually appear at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

Because this site uses relative paths, it will work as either a user page or a project page.

## Suggesting Changes

Suggestions do not need to come through GitHub pull requests.

If you want to recommend a resource, the simplest option is to send a message with:

- resource name
- link
- age group
- short description

If you are comfortable with GitHub, you can also open a pull request that updates `resources.js`.

Pull requests are welcome, but they are optional. Resources are curated before being added.

## Curation Notes

- Linked resources are official sites where I could verify a usable current URL.
- A few items remain intentionally unlinked when an official public page was not clear enough to add confidently.
