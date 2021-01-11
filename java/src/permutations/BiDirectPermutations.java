package permutations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class BiDirectPermutations {

	private static Permutation swap(Integer slotI, Integer slotJ, Permutation permutation, Integer steps) {		
		final List<Integer> swappedPermutation = new ArrayList<>(permutation.permutation);
		final Integer valueI = swappedPermutation.get(slotI);
		final Integer valueJ = swappedPermutation.get(slotJ);
		swappedPermutation.set(slotI, valueJ);
		swappedPermutation.set(slotJ, valueI);
		return new Permutation(new LinkedHashSet<>(swappedPermutation), steps);
	}

	private static Set<Permutation> generatePermutations(Integer steps, Permutation permutation, Set<Permutation> permutations) {
		Set<Permutation> addedPermutations = new LinkedHashSet<>();
		for (int i = 0; i < permutation.size(); i++) {
			for (int j = permutation.size() - 1; j > 0; j--) {
				Permutation swapped = swap(i, j, permutation, steps);
				if (!permutations.contains(swapped)) {
					addedPermutations.add(swapped);				
				}				
			}
		}		
		permutations.addAll(addedPermutations);
		if (steps > 1) {
			for (Permutation addedPermutation : addedPermutations) {
				generatePermutations(steps - 1, addedPermutation, permutations);		
			}
		}
		return permutations;
	}

	public static void main(String ... args) {
		Set<Permutation> permutations = generatePermutations(4, new Permutation(new HashSet<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9)), 4), new HashSet<>());
		System.out.println(permutations);
		System.out.println(permutations.size());
		System.out.println(permutations.stream().map(Permutation::getPermutationAsString).filter(p -> p.equals("987654321")).count());
		System.out.println(permutations.stream().map(Permutation::getPermutationAsString).filter(p -> p.equals("987654321")).findFirst());
		System.out.println(permutations.contains(new Permutation(new LinkedHashSet<Integer>(Arrays.asList(9, 8, 7, 6, 5, 4, 3, 2, 1)), 1)));
	}

}
