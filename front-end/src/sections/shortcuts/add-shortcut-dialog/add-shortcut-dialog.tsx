import { useEffect, useState } from "react";
import "./add-shortcut-dialog.css";
import Button from "../../../widgets/button/button";
import Spacer from "../../../widgets/spacer";
import Alert from "../../../widgets/alert/alert";

interface WebsiteInfo {
    title?: string | null;
    favicon: string;
}

type Props = {
    onCreate: (icon: string, title: string, url: string) => void;
    onClose: () => void;
};

export default function AddShortcutDialog(props: Props) {
    // State
    const [icon, setIcon] = useState("");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const [validating, setValidating] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    // Methods
    const validate = () => {
        if (validated) {
            if (title === "" || url === "") {
                setError("Title and URL are required");
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
            setError("URL is required");
            return false;
        }

        // Validate URL
        const urlRegex = new RegExp("^(http|https)://", "i");
        if (!urlRegex.test(url)) {
            setValidating(false);
            setError("Invalid URL");
            return false;
        }

        // Get website info
        getWebsiteInfo(url).then((info) => {
            if (!info) {
                setError("Failed to fetch website info");
                setValidating(false);
                return false;
            }

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

    const getWebsiteInfo = async (url: string): Promise<WebsiteInfo | undefined> => {
        try {
            const faviconUrl = faviconURL(url);
            const hostname = await getTitle(url);

            return { title: hostname, favicon: faviconUrl };
        } catch (error) {
            console.error("Error fetching website data:", error);
            return undefined;
        }
    };

    // Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            validate();
        }

        // Close dialog
        if (e.key === "Escape") {
            props.onClose();
        }
    };

    // Effects
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    // Render
    return (
        <div className="add-shortcut-dialog">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="icon-field">
                    <img src={icon} />
                </div>

                <Spacer height={20} />
                {validated && (
                    <div className="field">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={validating && !title ? "invalid" : ""}
                        />
                    </div>
                )}

                <div className="field">
                    <input
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={(e) => {
                            setValidated(false);
                            setUrl(e.target.value)
                        }}
                        className={validating && !url ? "invalid" : ""}
                    />
                </div>

                <Spacer height={16} />
                {error && (
                    <>
                        <Alert message={error} />
                        <Spacer height={32} />
                    </>
                )}
                <div className="actions">
                    <Button
                        onClick={() => {
                            validate();
                        }}
                    >
                        {validated ? "Add" : "Fetch Info"}
                        {validating && !validated && " ..."}
                    </Button>
                    <Button
                        onClick={() => {
                            // Reset
                            setIcon("");
                            setTitle("");
                            setUrl("");
                            setValidated(false);
                            setValidating(false);
                            setError(undefined);

                            // Close dialog
                            props.onClose();
                        }}
                    >
                        Close
                    </Button>
                </div>
            </form>
        </div>
    );
}