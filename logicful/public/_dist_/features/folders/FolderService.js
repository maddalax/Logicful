import {getApi} from "../../services/ApiService.js";
import {me} from "../../services/AuthService.js";
import {fastClone} from "../../util/Compare.js";
import {set} from "../../util/Selection.js";
export async function getFolders(cache = true, each) {
  const current = await getApi("folder");
  const user = me();
  current.push({
    name: "Uncategorized",
    id: `${user.teamId}:uncategorized`,
    isUncategorized: true
  });
  let results = {};
  let parentMap = {};
  let folderIdMap = {};
  current.forEach((f) => {
    each?.(f);
    parentMap[f.id] = f.parent;
    folderIdMap[f.id] = fastClone(f);
    if (!f.parent) {
      results[f.id] = f;
    }
  });
  current.forEach((f) => {
    if (f.parent) {
      let root = f.parent;
      let paths = new Set([f.id, root]);
      while (true) {
        if (!root) {
          break;
        }
        root = parentMap[root];
        if (!root) {
          break;
        }
        paths.add(root);
      }
      const fullPath = Array.from(paths).map((p) => folderIdMap[p]).reverse();
      let path = "";
      fullPath.forEach((folder, i) => {
        path += folder.id;
        set(results, path, folder);
        path += `.children.`;
      });
    }
  });
  return results;
}
