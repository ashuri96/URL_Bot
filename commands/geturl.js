const { SlashCommandBuilder } = require('discord.js');
const urlStorage = require('../urlStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geturl')
		.setDescription('指定したユーザーと保存済みのサイト名からURLを取得します')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('URLを確認したいユーザー')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('name')
				.setDescription('保存されたサイト名を選んでください')
				.setRequired(true)
				.setAutocomplete(true) // 👈 補完対応
		),

	// 🔽 autocomplete（選択したユーザーの保存済みURL名を表示）
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const targetUser = interaction.options.getUser('target') ?? interaction.user;
		const userID = targetUser.id;

		const allUrls = urlStorage.getAllUrls(userID);
		const allNames = Object.keys(allUrls);

		const filtered = allNames.filter(name =>
			name.toLowerCase().includes(focusedValue.toLowerCase())
		);

		await interaction.respond(
			filtered.map(name => ({ name, value: name })).slice(0, 25)
		);
	},

	// 🔽 実行処理（選んだ名前のURLを表示）
	async execute(client, interaction) {
		const targetUser = interaction.options.getUser('target');
		const name = interaction.options.getString('name');
		const userID = targetUser.id;

		if (!urlStorage.hasUrl(userID, name)) {
			await interaction.reply({
				content: `❌ ユーザー <@${userID}> は「${name}」という名前のURLを登録していません。`,
				ephemeral: false,
			});
			return;
		}

		const url = urlStorage.getUrl(userID, name);

		await interaction.reply({
			content: `🔗 ユーザー <@${userID}> の「${name}」のURLはこちら：\n${url}`,
			ephemeral: false,
		});
	},
};
