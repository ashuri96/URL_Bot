const { SlashCommandBuilder } = require('discord.js');
const urlStorage = require('../urlStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geturl')
		.setDescription('保存されたサイト名を選んでURLを表示します')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('保存されたサイト名を選んでください')
				.setRequired(true)
				.setAutocomplete(true)
		),

	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const userID = interaction.user.id;

		const allUrls = urlStorage.getAllUrls(userID);
		const allNames = Object.keys(allUrls);

		const filtered = allNames.filter(name =>
			name.toLowerCase().includes(focusedValue.toLowerCase())
		);

		await interaction.respond(
			filtered.map(name => ({ name, value: name })).slice(0, 25)
		);
	},

	async execute(client, interaction) {
		const name = interaction.options.getString('name');
		const userID = interaction.user.id;

		if (!urlStorage.hasUrl(userID, name)) {
			await interaction.reply({
				content: `❌ あなたは「${name}」という名前のURLを登録していません。`,
				ephemeral: true,
			});
			return;
		}

		const url = urlStorage.getUrl(userID, name);

		await interaction.reply({
			content: `🔗 「${name}」のURLはこちら：\n${url}`,
			ephemeral: false,
		});
	},
};
