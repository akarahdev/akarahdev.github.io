import os
import shutil
import time
import markdown2
import http.server
import socketserver


def main():
    extras = ["fenced-code-blocks", "highlightjs-lang"]
    print("Clearing ./docs")

    shutil.rmtree("./docs", ignore_errors=True)

    with open("./python/template.html") as template_file:
        template_text = template_file.read()

    for (
        root,
        dirs,
        files,
    ) in os.walk("./src"):

        for file in files:

            new_file: str = root.replace("/src", "/docs") + "/" + file
            file: str = root + "/" + file

            try:
                os.makedirs(os.path.dirname(new_file))
            except FileExistsError:
                # we don't care that it already exists
                pass

            if file.endswith(".md"):
                slash_occurrences = file.count("/")
                stylesheet_path = ("../" * (slash_occurrences - 2)) + "./base.css"
                code_path = ("../" * (slash_occurrences - 2)) + "./code.css"
                with open(file, "r") as f:
                    file_text = f.read()

                new_file = new_file.replace(".md", ".html")

                parsed = markdown2.markdown(file_text, extras=extras)

                if "<!--IgnoreTemplate-->" in parsed:
                    output = parsed
                else:
                    output = (
                        template_text
                        # Replace template content
                        .replace("%{CONTENT}%", parsed)
                        # Replace stylesheet link
                        .replace("%{STYLESHEET_LINK}%", stylesheet_path)
                        .replace("%{CODE_STYLESHEET_LINK}%", code_path)
                        # Replace `.md` references to `.html` for utility
                        .replace(".md", ".html")
                    )

                print(f"Translated file: {file} => {new_file}")
                with open(new_file, "w") as opened_new_file:
                    opened_new_file.write(output)
            else:
                print(f"Copied file: {file} => {new_file}")
                with open(new_file, "wb") as opened_new_file:
                    with open(file, "rb") as opened_file:
                        opened_new_file.write(opened_file.read())
            pass

    handler = http.server.SimpleHTTPRequestHandler

    os.chdir("./docs/")
    with socketserver.TCPServer(("", 8002), handler) as server:
        print(f"Serving at port 8002")
        try:
            server.serve_forever()
        except:
            pass


if __name__ == "__main__":
    main()
