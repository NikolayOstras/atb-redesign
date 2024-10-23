export function removeDoubleSlash(url: string): string {
	return url.replace(/\/\//g, '/')
}
