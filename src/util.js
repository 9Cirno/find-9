export function getRedirectPath({type, avatar}){
	let url = (type==='boss')? '/boss':'/seeker'
	if (!avatar){
		url+='info'
	}
	return url
}