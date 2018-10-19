import AppStore from "../store/apps";

export default async function wrapResult(action: Promise<any>) {
    const result: any = await action;
    if (result.success) {
        AppStore.showToast(result.msg, "success", 2000);
        return result.data;
    } else {
        AppStore.showToast(result.msg, "error", 2000);
    }
}