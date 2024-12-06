import { Test } from "@nestjs/testing";
import { ProblemController } from "../../src/problem/problem.controller"
import { ProblemService } from "../../src/problem/problem.service";
import { ProblemTags } from "../../src/problem/problem.tags";
import { ProblemDifficulty } from "../../src/problem/problem.difficulty";
import { Problem } from "../../src/problem/problem.entity";
import { ProblemRepository } from "../../src/problem/problem.repository";

describe("Problem Controller", () => {
    let problemController: ProblemController;
    let problemService: ProblemService;

    const mockRepo = {
	findById: jest.fn(),
    }

    beforeEach(async () => {
	const moduleRef = await Test.createTestingModule({
	    controllers: [ProblemController],
	    providers: [
		ProblemService,
		{
		    provide: ProblemRepository,
		    useValue: mockRepo
		}
	    ]
	}).compile();

	problemService = moduleRef.get(ProblemService);
	problemController = moduleRef.get(ProblemController);
    });

    describe('fetchProblem', () => {
	it('Should return a problem', async () => {
	    const mockProblem: Problem = {
		id: 1,
		title: "Sample Problem",
		description: "This is a sample problem.",
		tags: [ProblemTags.ALGORITHMS, ProblemTags.DATA_STRUCTURES],
		difficulty: ProblemDifficulty.MEDIUM,
		testInputs: ["[1, 2, 3]", "[4, 5, 6]"],
		expectedOutputs: ["6", "15"],
		boilerplate: "// Start coding here...",
	    };

	    jest.spyOn(problemService, "findById").mockResolvedValue(mockProblem);

	    const result = await problemController.fetchProblem(1);

	    expect(result).toEqual(mockProblem);
	    expect(problemService.findById).toHaveBeenCalledWith(1);
	})

	it('Should return null if the id is not found', async () => {
	    jest.spyOn(problemService, "findById").mockResolvedValueOnce(null);
	    expect(await problemController.fetchProblem(999)).toBe(null);
	    expect(problemService.findById).toHaveBeenCalledWith(999);
	})
    });
})
