const { SlashCommandBuilder } = require('discord.js');
const urlStorage = require('../urlStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seturl')
		.setDescription('任意の名前とURLを紐づけて保存します')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('保存するURLに付ける名前（新規 or 既存）')
				.setRequired(true)
				.setAutocomplete(true) // 👈 追加：補完対応
		)
		.addStringOption(option =>
			option.setName('url')
				.setDescription('保存するURL')
				.setRequired(true)
		),

	// 🔽 autocomplete の追加
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
		const url = interaction.options.getString('url');
		const userID = interaction.user.id;

		urlStorage.setUrl(userID, name, url);

		await interaction.reply({
			content: `✅ 名前「${name}」でURL「${url}」を保存しました！（既存なら上書き）`,
			ephemeral: true,
		});
	},
};
