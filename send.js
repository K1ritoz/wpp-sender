async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	const main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`);
	
	if(!textarea) throw new Error("Não há uma conversa aberta");
	
	for(const line of lines){
		console.log(line);
	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));
	
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}

let message = "Words to Send";
let scriptText = Array(100).fill(message).join('\n'); // Altere o "100" pela quantidade de mensagens

enviarScript(scriptText).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error);
