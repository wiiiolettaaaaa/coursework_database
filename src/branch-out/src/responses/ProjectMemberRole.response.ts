export class ProjectMemberRoleResponse {
    id: string;
    name: string;
    description: string;

    constructor(partial: Partial<ProjectMemberRoleResponse>) {
        Object.assign(this, partial);
    }
}