const { SlashCommandBuilder } = require('discord.js');
const seturl = require('./seturl.js'); // seturlのuserUrlDataを共有

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geturl')
		.setDescription('指定したユーザーと名前からURLを表示します')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('URLを確認したいユーザーを選んでください')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('name')
				.setDescription('取得したいURLの名前を入力してください')
				.setRequired(true)
		),

	async execute(client, interaction) {
		const targetUser = interaction.options.getUser('target');
		const name = interaction.options.getString('name');
		const userID = targetUser.id;
		const userUrlData = seturl.userUrlData;

		if (!userUrlData.has(userID)) {
			await interaction.reply({
				content: `❌ ユーザー <@${userID}> はまだURLを登録していません。`,
				ephemeral: false,
			});
			return;
		}

		const urlMap = userUrlData.get(userID);
		const url = urlMap[name];

		if (!url) {
			await interaction.reply({
				content: `❌ ユーザー <@${userID}> は「${name}」という名前のURLを登録していません。`,
				ephemeral: false,
			});
			return;
		}

		await interaction.reply({
			content: `🔗 ユーザー <@${userID}> の「${name}」のURLはこちら：\n${url}`,
			ephemeral: false,
		});
	},
};
