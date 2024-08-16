// Your script code here
// const fs = require("fs");
import fs from "fs";
// const path = require("path");
import path from "path";
try {
    // Define the path to the components directory
    const componentsDir = path.join(process.cwd(), "src", "components");

    // Check if the components directory exists
    if (!fs.existsSync(componentsDir)) {
        console.error(`Directory ${componentsDir} does not exist.`);
        process.exit(1);
    }

    // Read all items in the components directory
    const items = fs.readdirSync(componentsDir);

    // Filter out only directories
    const directories = items.filter(item => {
        return fs.statSync(path.join(componentsDir, item)).isDirectory();
    });

    // Function to create or prompt for overwrite
    const createFile = (filePath, content) => {
        if (fs.existsSync(filePath)) {
            console.log(`File ${path.basename(filePath)} already exists.`);
        } else {
            fs.writeFileSync(filePath, content);
            console.log(`File ${path.basename(filePath)} has been created.`);
        }
    };

    // Loop through each directory and create the necessary files
    directories.forEach(dir => {
        const componentName = dir;
        const componentDir = path.join(componentsDir, componentName);

        const jsxFile = path.join(componentDir, `${componentName}.jsx`);
        const cssFile = path.join(componentDir, `${componentName}.module.css`);

        const jsxContent = `
        import css from './${componentName}.module.css';

        const ${componentName} = () => {
        return (
                <div className={css.${componentName.toLowerCase()}}>
                {/* Your component code here */}
                </div>
                );
        };

        export default ${componentName};
        `;

        const cssContent = `
        .${componentName.toLowerCase()} {
        /* Your styles here */
        }
        `;

        // Create or overwrite the files
        createFile(jsxFile, jsxContent);
        createFile(cssFile, cssContent);
    });

    console.log("All components have been processed.");
} catch (err) {
    console.error("An error occurred:", err.message);
    console.error(err.stack);
}
