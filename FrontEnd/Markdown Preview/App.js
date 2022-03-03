marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markdown: placeholder,
            editorMaximized: false,
            previewMaximized: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.editorMaximized = this.editorMaximized.bind(this)
        this.previewMaximized = this.previewMaximized.bind(this)
    }

    handleChange(e) {
        let data = e.target.value;
        
//         if (/(?!<style>)\w+\.\w+\s(?!<\/style>)/gi.test(data)) {
//             data = data.replace(/(\w+)\.(\w+)/gi, `<$1 className="$2"></$1>`)
//         }

//         if (/(?!<style>)\.\w+\s(?!<\/style>)/gi.test(data)) {
//             data = data.replace(/\.(\w+)/gi, `<div className="$1"></div>`)
//         }

//         if (/\w+\#\w+\s/gi.test(data)) {
//             data = data.replace(/(\w+)\#(\w+)/gi, `<$1 id="$2"></$1>`)
//         }

//         if (/\#\w+\s/gi.test(data)) {
//             data = data.replace(/\#(\w+)/gi, `<div id="$1"></div>`)
//         }

        this.setState({
            markdown: data
        })
    }

    editorMaximized() {
        this.setState({
            editorMaximized: !this.state.editorMaximized
        })
    }

    previewMaximized() {
        this.setState({
            previewMaximized: !this.state.previewMaximized
        })
    }

    render() {
        return (
            <>
            <div className={this.state.editorMaximized ? "editorPage active" : "editorPage"}>
              <div className="editorHeader">
             <div className="editorLogo">
            <p><i className="bx bx-code-alt"></i> Editor</p>
             </div>
             <div className="editorMax">
            <button title="Maximize" onClick={this.editorMaximized}>
             <i className={this.state.editorMaximized ? "bx bx-collapse" : "bx bx-expand"}></i>
            </button>
             </div>
              </div>
              <div className="editorArea">
                <Editor onChange={this.handleChange} markdown={this.state.markdown} />
              </div>
            </div>

        <div className={this.state.previewMaximized ? "previewPage active" : "previewPage"}>
            <div className="previewHeader">
                <div class="previewLogo">
                    <p><i class="bx bxl-html5"></i> Preview </p>
                </div>
                <div class="previewMax">
                <button title="Maximize" onClick={this.previewMaximized}>
             <i className={this.state.editorMaximized ? "bx bx-collapse" : "bx bx-expand"}></i>
             </button>
                </div>
            </div>
            <Preview markdown={this.state.markdown} />
        </div>
            </>
        )
    }
}

const Editor = props => {
    return (
        <textarea id="editor" onChange={props.onChange} value={props.markdown}></textarea>
        )
}

const Preview = props => {
    return (
			<div id="preview" dangerouslySetInnerHTML={{
                __html: marked.parse(props.markdown)
				}}>
				</div>
    )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;


ReactDOM.render(<App />, document.getElementById("App"))