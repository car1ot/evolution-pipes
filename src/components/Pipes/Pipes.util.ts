const rotations = {
    '╸': '╹',
    '╹': '╺',
    '╺': '╻',
    '╻': '╸',
    '━': '┃',
    '┃': '━',
    '┓': '┛',
    '┛': '┗',
    '┗': '┏',
    '┏': '┓',
    '┣': '┳',
    '┳': '┫',
    '┫': '┻',
    '┻': '┣',
    '╋': '╋',
};

/**
 *
 * @param pipe symbol
 * @returns next rotation pipe symbol
 */
export function rotatePipe(pipe: string): string {
    return rotations[pipe];
}
