const { SlashCommandBuilder } = require('discord.js');

// メモリ内のデータ管理（ユーザーIDごとに名前付きURLを保存）
const userUrlData = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seturl')
		.setDescription('任意の名前とURLを紐づけて保存します')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('保存するURLに付ける名前')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('url')
				.setDescription('保存するURL')
				.setRequired(true)
		),

	async execute(client, interaction) {
		const name = interaction.options.getString('name');
		const url = interaction.options.getString('url');
		const userID = interaction.user.id;

		// 初回なら初期化
		if (!userUrlData.has(userID)) {
			userUrlData.set(userID, {});
		}

		const urlMap = userUrlData.get(userID);
		urlMap[name] = url; // 上書きOK

		await interaction.reply({
			content: `🔖 名前「${name}」でURL「${url}」を保存しました！`,
			ephemeral: true,
		});
	},

	// 他のコマンドからアクセス可能に
	userUrlData,
};
