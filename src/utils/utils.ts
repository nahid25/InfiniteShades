import { StatType, incrementStats } from "../services/db";

export const getDateInMillis = () => {
  return new Date(new Date().toISOString()).getTime();
}

export const getFormattedDate = (date: number) => {
  const formattedDate = new Date(date);
  // Format the date as "day month year"
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return formattedDate.toLocaleDateString("en-US", dateOptions);
}

export enum DownloadOption {
    'Small' = 'Small',
    'Medium' = 'Medium',
    'Large' = 'Large'
}

export const downloadImage = (id: string, url: string, option?: DownloadOption) => {
    let sizeParams = "";
    switch (option) {
      case DownloadOption.Small:
        sizeParams = "&w=400&h=300";
        break;
      case DownloadOption.Medium:
        sizeParams = "&w=800&h=600";
        break;
      case DownloadOption.Large:
        sizeParams = "&w=1600&h=1200";
        break;
      default:
        sizeParams = ""; // Original size
        break;
    }

    const downloadUrl = `${url}?auto=format${sizeParams}`;

    const urlObject = new URL(downloadUrl);
    const pathname = urlObject.pathname; // Gets the path: /_MG_8226.jpg
    const imageName = pathname.split("/").pop();

    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        incrementStats(id, StatType.Download);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name + " " + imageName + " Infinite shades.jpg";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.error("An error occurred during download:", error)
      );
}