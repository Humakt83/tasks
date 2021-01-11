package permutations;

import java.util.Set;

public class Permutation {
	public final Set<Integer> permutation;
	public final Integer step;

	public Permutation(Set<Integer> permutation, int step) {
		this.permutation = permutation;
		this.step = step;
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((permutation == null) ? 0 : permutation.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj != null && obj instanceof Permutation) {
			return this.getPermutationAsString().equals(((Permutation)obj).getPermutationAsString());
		}
		return false;
	}

	public String getPermutationAsString() {
		return this.permutation.stream()
				.map(val -> val.toString())
				.reduce((a, b) -> a.concat(b))
				.orElse("");
	}
	
	public int size() {
		return this.permutation.size();
	}
	
	@Override
	public String toString() {
		return "Steps left: " + step + ", Permutation: " + permutation.toString() + "\n";
	}
}