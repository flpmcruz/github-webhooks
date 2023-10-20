import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubService = new GitHubService(),
    private readonly discordService = new DiscordService()
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const payload = req.body;
    const githubEvent = req.headers["x-github-event"] ?? "unknown";
    const signature = req.headers["x-hub-signature-256"] ?? "unknown";
    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload);
        break;

      case "issues":
        message = this.githubService.onIssue(payload);
        break;

      default:
        message = `Event ${githubEvent} not supported`;
    }

    this.discordService
      .notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(500).send("Internal Server Error"));
  };
}
