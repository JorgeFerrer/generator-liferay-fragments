const getProjectContent = require('../get-project-content');
const getTestFixtures = require('../get-test-fixtures');
const path = require('path');
const tmp = require('tmp');
const writeProjectContent = require('../write-project-content');

describe('utils/write-project-content', () => {
  getTestFixtures().forEach(projectPath => {
    it('needs a valid projectBasePath parameter', () => {
      expect(writeProjectContent(null, null)).rejects.toMatchSnapshot();
    });

    it('needs a valid projectContent parameter', () => {
      expect(
        writeProjectContent(`${path.sep}tmp`, null)
      ).rejects.toMatchSnapshot();
    });

    it('writes a project inside a given path', async () => {
      const tmpDir = tmp.dirSync({ unsafeCleanup: true });
      const projectContent = getProjectContent(projectPath);

      await writeProjectContent(tmpDir.name, projectContent);

      const newProjectContent = getProjectContent(tmpDir.name);
      tmpDir.removeCallback();

      expect(projectContent.collections).toEqual(newProjectContent.collections);
    });
  });
});
