import { useState } from "react";
import "./add-shortcut-dialog.css";
import Button from "../../../widgets/button/button";

interface WebsiteInfo {
    title?: string | null;
    favicon: string;
}

type Props = {
    onCreate: (icon: string, title: string, url: string) => void;
};

export default function AddShortcutDialog(props: Props) {
    // State
    const [icon, setIcon] = useState("");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const [validating, setValidating] = useState(false);
    const [validated, setValidated] = useState(false);

    // Methods
    const validate = () => {
        console.log("Validating...", validated);
        if (validated) {
            if (title === "" || url === "") {
                return false;
            }

            // Create shortcut
            props.onCreate(icon, title, url);

            // Reset
            setIcon("");
            setTitle("");
            setUrl("");
            setValidated(false);
            setValidating(false);
            return;
        }

        setValidating(true);
        if (url === "") {
            setValidating(false);
            return false;
        }

        // Validate URL
        const urlRegex = new RegExp("^(http|https)://", "i");
        if (!urlRegex.test(url)) {
            setValidating(false);
            return false;
        }

        // Get website info
        getWebsiteInfo(url).then((info) => {
            setTitle(info.title || "");
            setIcon(info.favicon);
        });

        setValidating(false);
        setValidated(true);
        return false;
    };

    function faviconURL(u: string) {
        const url = new URL(`https://www.google.com/s2/favicons?sz=32&domain_url=${u}`);
        url.searchParams.set("pageUrl", u);
        url.searchParams.set("size", "32");
        return url.toString();
    }

    function getTitle(url: string) {
        // Parse URL
        const parsedUrl = new URL(url);

        // Get hostname
        const hostname = parsedUrl.hostname;

        // Parse title from hostname
        const title = hostname.replace("www.", "").split(".")[0];

        // Return Capitalized Title
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    const getWebsiteInfo = async (url: string): Promise<WebsiteInfo> => {
        try {
            const faviconUrl = faviconURL(url);
            const hostname = await getTitle(url);

            return { title: hostname, favicon: faviconUrl };
        } catch (error) {
            console.error("Error fetching website data:", error);
            return { title: "Error fetching title", favicon: "" };
        }
    };

    // Render
    return (
        <div className="add-shortcut-dialog">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="icon-field">
                    <img src={icon} />
                </div>

                <div className="field">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={validating && !title ? "invalid" : ""}
                    />
                </div>

                <div className="field">
                    <label>URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setValidated(false);
                            setUrl(e.target.value)
                        }}
                        className={validating && !url ? "invalid" : ""}
                    />
                </div>

                <Button
                    onClick={() => {
                        validate();
                    }}
                >
                    {validated ? "Add" : "Fetch Info"}
                </Button>
            </form>
        </div>
    );
}