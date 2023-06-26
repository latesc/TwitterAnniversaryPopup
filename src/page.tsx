import * as React from "react";
import * as Form from "@radix-ui/react-form";

const App: React.SFC = () => {
    const [formData, setFormData] = React.useState({
        // title: "",
        // heading: "",
        // buttonText: "",
        // tweetText: "",
        // imageURL: "",

        title: "a",
        heading: "a",
        buttonText: "a",
        tweetText: "a",
        imageURL:
            "https://pbs.twimg.com/media/FzgKfSsXwAEYpnu?format=jpg&name=large",
    });
    const [link, setLink] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setLink(
            `https://twitter.com/i/notifications/anniversary?title=${encodeURIComponent(
                formData.title
            )}&message=${encodeURIComponent(
                formData.heading
            )}&action=${encodeURIComponent(
                formData.buttonText
            )}&text=${encodeURIComponent(
                formData.tweetText
            )}&image_attachment=${encodeURIComponent(formData.imageURL)}`
        );
        // https://twitter.com/i/notifications/anniversary?title=123123&message=4441&action=234&text=5&image_attachment=
    };
    const copy = async () => {
        await navigator.clipboard.writeText(link);
        alert("Text copied");
    };
    return (
        <>
            <header>
                <h1>Twitter Anniversary Popup</h1>
            </header>
            <TwitterForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
            <div className="linkArea">
                <label id="link" className="linkArea__label">
                    Link
                    <button
                        type="button"
                        className="linkArea__copyButton"
                        onClick={copy}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                            ></rect>
                            <path d="M5 15l2-2 4 4"></path>
                        </svg>
                    </button>
                </label>
                <textarea
                    id="link"
                    className="textArea"
                    wrap="off"
                    value={link}
                    placeholder="Generate a link to see the preview"
                    readonly
                    onFocus={(event) => event.target.select()}
                ></textarea>
            </div>
            <footer>
                Made with 💙 by <a href="https://latesc.com">@latesc</a>
            </footer>
        </>
    );
};

const TwitterForm: React.SFC = ({ formData, setFormData, onSubmit }) => {
    return (
        <Form.Root className="form" onSubmit={onSubmit}>
            <TwitterFormField
                title="title"
                label="Title"
                messages={
                    <TwitterFormMessage
                        match="valueMissing"
                        message="Please enter a title"
                    />
                }
                type="string"
                placeholder="Happy Twitter anniversary!"
                formData={formData}
                setFormData={setFormData}
            />
            <TwitterFormField
                title="heading"
                label="Heading"
                messages={
                    <TwitterFormMessage
                        match="valueMissing"
                        message="Please enter a heading"
                    />
                }
                type="string"
                placeholder="Celebrate with a Tweet"
                formData={formData}
                setFormData={setFormData}
            />
            <TwitterFormField
                title="buttonText"
                label="Button Text"
                messages={
                    <TwitterFormMessage
                        match="valueMissing"
                        message="Please enter the button text"
                    />
                }
                type="string"
                placeholder="Celebrate with a Tweet"
                formData={formData}
                setFormData={setFormData}
            />
            <TwitterFormField
                title="tweetText"
                label="Tweet Text"
                messages={
                    <TwitterFormMessage
                        match="valueMissing"
                        message="Please enter the Tweet text"
                    />
                }
                type="string"
                placeholder="Do you remember when you joined Twitter? I do! #MyTwitterAnniversary"
                formData={formData}
                setFormData={setFormData}
            />
            <TwitterFormField
                title="imageURL"
                label="Image URL"
                messages={
                    <>
                        <TwitterFormMessage
                            match="valueMissing"
                            message="Please enter a Twitter img URL"
                        />
                        <TwitterFormMessage
                            match="typeMismatch"
                            message="Please enter a valid Twitter img URL"
                        />
                    </>
                }
                type="url"
                placeholder="https://ton.twimg.com/ntab_public/twitterversary/year15.jpg"
                formData={formData}
                setFormData={setFormData}
                pattern="https:\/\/[A-Za-z]+.twimg.com\/(.+)"
            />
            <Form.Submit className="form__submit">Generate</Form.Submit>
        </Form.Root>
    );
};

const TwitterFormField: React.SFC = ({
    title,
    label,
    messages,
    type,
    placeholder,
    formData,
    setFormData,
    ...props
}) => {
    return (
        <Form.Field className="form__field" name={title}>
            <Form.Label className="form__label">{label}</Form.Label>
            {messages}
            <Form.Control asChild>
                <input
                    className="textArea"
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    required
                    value={formData[title]}
                    onChange={(event) => {
                        const { value } = event.target;
                        setFormData((prevData) => ({
                            ...prevData,
                            [title]: value,
                        }));
                    }}
                    {...props}
                />
            </Form.Control>
        </Form.Field>
    );
};

const TwitterFormMessage: React.SFC = ({ match, message, ...props }) => (
    <Form.Message className="form__message" match={match}>
        {message}
    </Form.Message>
);

export default App;
