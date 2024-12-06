import { Language } from "../submission/submission.entity";

export const languageConfig: { [key in Language]: any } = {
    [Language.C]: {
	"dockerImage": "gcc",
	"extension": ".c",
	"compiled": true,
	"compiler": "gcc",
	"outFlag": "-o",
    },

    [Language.CPP]: {
	"dockerImage": "gcc",
	"extension": ".cpp",	
	"compiled": true,
	"compiler": "gcc",
	"outFlag": "-o",
    },

    [Language.Python]: {
	"dockerImage": "python",
	"extension": ".py",	
	"compiled": false,
	"runCmd": "python",
    },

    [Language.JS]: {
	"dockerImage": "node",
	"extension": ".js",	
	"compileer": false,
	"runCmd": "node"
    }
}
