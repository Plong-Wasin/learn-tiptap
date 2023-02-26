import Image from "@tiptap/extension-image";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

interface MenuBarProps {
    editor: Editor | null;
}
const isValidUrl = (urlString: string) => {
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
};

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) return null;
    return (
        <div>
            <button
                onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                        const currentTarget = e?.target as HTMLInputElement;
                        const file = currentTarget?.files?.[0];
                        if (!file) {
                            return;
                        }
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            // set image to current and center
                            editor
                                .chain()
                                .focus()
                                // .insertContent("<p>")
                                // .setImage({
                                //     src:
                                //         typeof reader.result === "string"
                                //             ? reader.result
                                //             : "",
                                // })
                                // .insertContent("</p>")
                                // .insertContent({
                                //     type: "paragraph",
                                //     content: [
                                //         {
                                //             type: "image",
                                //             attrs: {
                                //                 src: reader.result,
                                //             },
                                //         },
                                //     ],
                                // })
                                .setImage({
                                    src:
                                        typeof reader.result === "string"
                                            ? reader.result
                                            : "",
                                })
                                .run();
                            // editor
                            //     .chain()
                            //     .focus()
                            //     .setImage({
                            //         src:
                            //             typeof reader.result === "string"
                            //                 ? reader.result
                            //                 : "",
                            //         alt: file.name,
                            //     })
                            //     .run();
                        };
                    };
                    input.click();
                    input.remove();
                    return false;
                }}
            >
                Image
            </button>
            <button
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setYoutubeVideo({
                            src: prompt("youtube link") ?? "",
                        })
                        .run()
                }
            >
                Youtube
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                style={editor.isActive("bold") ? { color: "red" } : {}}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                style={editor.isActive("italic") ? { color: "red" } : {}}
            >
                Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}>
                Strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                Underline
            </button>
            {/* <button onClick={() => editor.chain().focus().toggleCode().run()}>
                Code
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 1 }).run()
                }
            >
                H1
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 2 }).run()
                }
            >
                H2
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 3 }).run()
                }
            >
                H3
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 4 }).run()
                }
            >
                H4
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 5 }).run()
                }
            >
                H5
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setHeading({ level: 6 }).run()
                }
            >
                H6
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                Bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                Ordered list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                Code block
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                Blockquote
            </button> */}
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={
                    editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
            >
                left
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={
                    editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
            >
                center
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={
                    editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
            >
                right
            </button>
            <button
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setLink({
                            href: prompt("Set link") ?? "",
                        })
                        .run()
                }
            >
                Link
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                Horizontal rule
            </button>
            <button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
            >
                Superscript
            </button>

            {/* <button
                onClick={() => editor.chain().focus().setTextSelection(1).run()}
            >
                Subscript
            </button> */}
            {/* <button onClick={() => editor.chain().focus().setParagraph().run()}>
                Paragraph
            </button> */}
            {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
                Clear
            </button> */}
        </div>
    );
};
const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.extend({
                renderHTML: ({ HTMLAttributes }) => {
                    return ["p", ["img", HTMLAttributes]];
                },
            }),
            Link,
            Youtube,
            Underline,
            Superscript,
            Subscript,
            Image.extend({
                name: "handlerImage",
            }),
            TextAlign.extend({
                addCommands() {
                    return {
                        setTextAlign:
                            (alignment: string) =>
                            ({ commands }) => {
                                if (
                                    !this.options.alignments.includes(alignment)
                                ) {
                                    return false;
                                }

                                console.log(this.options);
                                return this.options.types.every((type) =>
                                    commands.updateAttributes(type, {
                                        textAlign: alignment,
                                    })
                                );
                            },

                        unsetTextAlign:
                            () =>
                            ({ commands }) => {
                                return this.options.types.every((type) =>
                                    commands.resetAttributes(type, "textAlign")
                                );
                            },
                    };
                },
            }).configure({
                types: ["paragraph"],
            }),
        ],
        content: "<p>Hello World! 🌎️</p>",
        // size 10 line
        editorProps: {
            attributes: {
                style: "min-height: 10em;",
            },
            handleDrop: (view, event, slics) => {
                if (event.dataTransfer?.types.includes("Files")) {
                    const files = event.dataTransfer.files;
                    const file = files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const node = view.state.schema.nodes.image.create({
                            src:
                                typeof reader.result === "string"
                                    ? reader.result
                                    : "",
                        });
                        console.log(view.state.selection.anchor);
                        const tr = view.state.tr.insert(
                            view.state.selection.anchor,
                            node
                        );
                        view.dispatch(tr);
                    };
                    return true;
                }
                return false;
            },
            handlePaste: (view, event, slice) => {
                if (isValidUrl(event.clipboardData?.getData("text") ?? "")) {
                    editor
                        ?.chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({
                            href: event.clipboardData?.getData("text") ?? "",
                        })
                        .run();
                    return true;
                }
                return false;
            },
        },
    });

    return (
        <>
            <style>
                {`
                  .tiptap-editor .iframe {

                    }
                `}
            </style>
            <MenuBar editor={editor} />
            <div className="tiptap-editor">
                <EditorContent editor={editor} />
            </div>
            <p>{editor?.getHTML()}</p>
            <p>{JSON.stringify(editor?.getJSON())}</p>
        </>
    );
};

export default Tiptap;
