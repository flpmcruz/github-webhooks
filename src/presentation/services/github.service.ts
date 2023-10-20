import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar = (payload: GitHubStarPayload): string => {
    const { sender, repository, action } = payload;

    return `User ${sender.login} ${action} star on the repository ${repository.full_name}`;
  };

  onIssue = (payload: GitHubIssuePayload): string => {
    const { action, issue, repository } = payload;

    if (action === "opened")
      return `New issue ${issue.title} on the repository ${repository.full_name}`;

    if (action === "closed")
      return `Issue ${issue.title} closed on the repository ${repository.full_name} by ${issue.user.login}`;

    if (action === "reopened")
      return `Issue ${issue.title} reopened on the repository ${repository.full_name} by ${issue.user.login}`;

    return `Action ${action} not supported`;
  };
}
