export default function codeCreator(startCode: string, midCode: string, endCode: string): string {
    return `
    ${startCode}
    
    ${midCode}
    
    ${endCode}
    `;
}

/**
 * for python end code could be an empty string
 * 
 * for java end code could be an empty string
 */