import { BoardDefinition } from '@circuit/shared';
export declare class BoardRegistry {
    private static boards;
    static registerBoard(board: BoardDefinition): void;
    static getBoard(id: string): BoardDefinition | undefined;
    static getAllBoards(): BoardDefinition[];
}
//# sourceMappingURL=BoardRegistry.d.ts.map