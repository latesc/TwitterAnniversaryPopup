import * as React from "react";
import * as Form from "@radix-ui/react-form";
import * as Toast from "@radix-ui/react-toast";

const App: React.SFC = () => {
    const [formData, setFormData] = React.useState({
        title: "",
        heading: "",
        buttonText: "",
        tweetText: "",
        imageURL: "",
    });
    const [link, setLink] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

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
    };
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(link);
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);
        }, 100);
    };

    React.useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

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
                <label htmlFor="link" className="linkArea__label">
                    <h2>Link</h2>
                    <Toast.Provider>
                        <button
                            type="button"
                            className="linkArea__copyButton"
                            onClick={copyToClipboard}
                        >
                            <img
                                src={require("./assets/copy.svg")}
                                alt="Copy to clipboard"
                            />
                        </button>
                        <Toast.Root
                            className="toast"
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <Toast.Title className="toast__title">
                                Copied to Clipboard
                            </Toast.Title>
                            <Toast.Action
                                className="ToastAction"
                                asChild
                                altText="Close Button"
                            >
                                <button className="toast__button">✖</button>
                            </Toast.Action>
                        </Toast.Root>
                        <Toast.Viewport className="toast__viewport" />
                    </Toast.Provider>
                </label>
                <textarea
                    id="link"
                    className="textArea"
                    wrap="off"
                    value={link}
                    placeholder="Generate a link to see the preview"
                    readOnly
                    onFocus={(event) => event.target.select()}
                ></textarea>
            </div>
            <footer>
                Made with 💙 by <a href="https://latesc.com">@latesc</a>
            </footer>
        </>
    );
};

const TwitterForm = ({ formData, setFormData, onSubmit }) => {
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

const TwitterFormField = ({
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

const TwitterFormMessage = ({ match, message, ...props }) => (
    <Form.Message className="form__message" match={match}>
        {message}
    </Form.Message>
);

export default App;
