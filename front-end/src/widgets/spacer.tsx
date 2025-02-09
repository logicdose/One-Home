/**
 * Spacer Widget
 * 
 * Adds space between elements, either horizontally or vertically.
 * 
 * @param {number} width - The width of the spacer.
 * @param {number} height - The height of the spacer. 
 * @returns {ReactNode} - A div element that adds space between elements.
 */
const Spacer = ({ width = 0, height = 0 }) => {
    return <div style={{ width, height }} />;
};

export default Spacer;
