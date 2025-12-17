import fs from "fs";
import path from "path";

export function storeData(data) {
    const folderPath = path.join(".", "data");

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    fs.writeFileSync(
        path.join(folderPath, "fear_greed.json"),
        JSON.stringify(data, null, 2)
    );
}
